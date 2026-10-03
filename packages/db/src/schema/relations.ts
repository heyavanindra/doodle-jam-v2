import { defineRelations } from 'drizzle-orm';

import { user } from './auth-schema.js';
import { room, roomMember } from './room.js';

export const relations = defineRelations(
  {
    user,
    room,
    roomMember,
  },
  (r) => ({
    user: {
      ownedRooms: r.many.room({
        from: r.user.id,
        to: r.room.ownerId,
      }),

      roomMemberships: r.many.roomMember({
        from: r.user.id,
        to: r.roomMember.userId,
      }),
    },

    room: {
      owner: r.one.user({
        from: r.room.ownerId,
        to: r.user.id,
      }),

      members: r.many.roomMember({
        from: r.room.id,
        to: r.roomMember.roomId,
      }),
    },

    roomMember: {
      user: r.one.user({
        from: r.roomMember.userId,
        to: r.user.id,
      }),

      room: r.one.room({
        from: r.roomMember.roomId,
        to: r.room.id,
      }),
    },
  }),
);
