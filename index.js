import { program, command } from 'bandersnatch'
import CDP from 'chrome-remote-interface'

async function getSource() {
  let client;
  try {
      // connect to endpoint
      client = await CDP();
      // extract domains
      const {Network, Page, Runtime} = client;
      // setup handlers
      // Network.requestWillBeSent((params) => {
      //     console.log(params.request.url);
      // });
      // enable events then start!
      await Network.enable();
      await Page.enable();
      // await Page.navigate({url: 'https://tabelog.com'});
      // await Page.loadEventFired();
      const result = await Runtime.evaluate({
        expression: 'document.documentElement.outerHTML'
      });
      const html = result.result.value;
      console.log(html);
  } catch (err) {
      console.error(err);
  } finally {
      if (client) {
          await client.close();
      }
  }
}

program()
  .prompt('CSC>')
  .default(
    command()
      .description('What is bandersnatch?')
      .action(() => console.log("test"))
  )
  .add(
    command("capture")
    .description('start capture')
    .action(async ()=>{
      let html = getSource();
      console.log(html);
    })
  )
  .repl()