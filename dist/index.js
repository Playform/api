import{Router as i}from"itty-router";import{Response as a}from"@cloudflare/workers-types";import{InteractionResponseType as c,InteractionType as o,verifyKey as p}from"discord-interactions";class s extends a{constructor(t,n={headers:{"content-type":"application/json;charset=UTF-8"}}){super(JSON.stringify(t),n)}}const r=i();r.post("/discord",async(e,t)=>{if(e.method==="POST"&&!p(await e.clone().arrayBuffer(),e.headers.get("x-signature-ed25519")??"",e.headers.get("x-signature-timestamp")??"",t.DISCORD_PUBLIC_KEY))return console.error("Invalid Request"),new a("Bad request signature.",{status:401});const n=await e.json();if(n.type===o.PING)return new s({type:c.PONG});if(n.type===o.APPLICATION_COMMAND)switch(n.data.name.toLowerCase()){case"invite":return new s({type:4,data:{content:`https://discord.com/oauth2/authorize?client_id=${t.DISCORD_APPLICATION_ID}&scope=applications.commands`,flags:64}});default:return new s({error:"Unknown Type"},{status:400})}return new s({error:"Unknown Type"},{status:400})}),r.all("*",()=>new a("404 | Not Found.",{status:404}));var m={async fetch(e,t){return r.handle(e,t)}};export{m as default};
