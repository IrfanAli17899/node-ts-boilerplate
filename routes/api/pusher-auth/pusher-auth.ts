import joi from 'joi';
import { Response, NextFunction } from 'express';
import ApiError from ':helpers/ApiError';
import { validation } from ':middlewares';
import { Request } from ':helpers/types';
import pusher, { userPusherChannel } from ':libs/pusher';


const pusherAuthSchemas = {
  reqQuery: joi.object({}).length(0),
  reqBody: joi.object({
    socket_id: joi.string().required(),
    channel_name: joi.string().pattern(/^private-.+/).required(),
  }),
};

interface PusherAuthReqBody {
  socket_id: string;
  channel_name: string;
}

const pusherAuth = (req: Request<PusherAuthReqBody>, res: Response, next: NextFunction) => {
  try {
    const { socket_id, channel_name } = req.body;
    const { user } = res.locals;

    const allowedChannel = userPusherChannel(user.auth_id);

    if (channel_name !== allowedChannel) {
      throw new ApiError(401, 'Channel is not allowed');
    }

    res.send(pusher.authenticate(socket_id, channel_name));
  } catch (err) {
    next(err);
  }
};

export default [
  validation.reqQueryValidator(pusherAuthSchemas.reqQuery),
  validation.reqBodyValidator(pusherAuthSchemas.reqBody),
  pusherAuth,
];
