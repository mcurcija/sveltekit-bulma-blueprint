import type { RequestHandler } from '@sveltejs/kit';

/** @type {import('@sveltejs/kit').RequestHandler} */
export  const get: RequestHandler = async () => {
    // simple random 
    var random = Math.floor(Math.random() * 1000);

    return {
    // NOTE cache control is used here for exemplary purposes only
    // In this case the client is instructed to uses cached value 
    // for next 5 seconds. Uncomment following lines in order to activate it.
    // Note that "disable cache" should not be active if developer tools are used)  
        // headers: {
        //     "cache-control": "public, max-age=5"
        // },
        body: { random }
    };
};
