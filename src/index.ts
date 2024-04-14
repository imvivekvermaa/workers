import { Hono } from 'hono'
import { Ai } from '@cloudflare/ai';
import { cors } from 'hono/cors';

const app = new Hono()

app.use('/*', cors())

interface Env {
  AI: any;
}

app.post('/:id', async(c :any) => {

  const ai = new Ai(c.env.AI);
  console.log(c.req)
  const messages = [
    { role: "system", content: "dont' end the response without completing the sentence."},
    {
      role: "user",
      content: "Tell me about Cloudflares workers",
    },
  ];
  const response = await ai.run("@cf/meta/llama-2-7b-chat-fp16", { messages });

  return new Response(JSON.stringify(response.response));
})


// app.get('/whispercls', async(c :any) => {
  
//   const ai = new Ai(c.env.AI);

//   const res: any = await fetch("https://github.com/Azure-Samples/cognitive-services-speech-sdk/raw/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav");
//                             //  https://github.com/Azure-Samples/cognitive-services-speech-sdk/blob/master/samples/cpp/windows/console/samples/enrollment_audio_katie.wav
//   // console.log(res)
  
//   const blob = await res.arrayBuffer();
  
//   const input = {
//     audio: [...new Uint8Array(blob)],
//   };
//   // console.log(input)

//   const response = await ai.run(
//     "@cf/openai/whisper",
//     input
//   );
//   // console.log(response)
//   const a= Response.json({ input: { audio: [] }, response });
//   return a;
  
// })


app.get('/img', async(c :any) => {
  
  const ai = new Ai(c.env.AI);
  console.log(c.req.body)

  const inputs = {
    prompt: "donalduck on moon",
  };

  const response = await ai.run(
    "@cf/stabilityai/stable-diffusion-xl-base-1.0",
    inputs
  );

  return new Response(response, {
    headers: {
      "content-type": "image/png",
    },
  }); 
})


export default app
