// @filename: client.ts
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import type { AppRouter } from './server';
 
// Notice the <AppRouter> generic here.
const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:4000/trpc',
    }),
  ],
});

trpc.getUser.query('1').then(user=>{console.log(user.name)});
trpc.createUser.mutate({name:'jacek sutryk'}).then(user=>{console.log(user)});