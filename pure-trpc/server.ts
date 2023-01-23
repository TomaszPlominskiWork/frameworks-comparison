import * as trpc from '@trpc/server';
import * as trpcExpress from '@trpc/server/adapters/express';
import { z } from 'zod';
import express from 'express'; 
 
interface User {
  id: string;
  name: string;
}
 
const userList: User[] = [
  {
    id: '1',
    name: 'KATT',
  },
];
 
const router = trpc.initTRPC.create().router
const procedure = trpc.initTRPC.create().procedure;

const appRouter = router({
    getUser: procedure
    .input(z.string())
    .query((req) => {
        const id: string = req.input;
      return userList.find(el=>el.id===id);
    }),
    createUser: procedure
    .input(z.object({ name: z.string().min(5) }))
    //skip addin user
    .mutation((req)=>{
        return {id:"5", name: req.input.name };
    })
});

const app = express();

app.use(
    '/trpc',
    trpcExpress.createExpressMiddleware({
      router: appRouter,
    })
  );
  app.listen(4000,()=>{console.log('listening on port 4000')});
 
export type AppRouter = typeof appRouter;