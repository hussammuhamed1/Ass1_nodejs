import fs from "fs";

//part 1 1:
const readableStream = fs.createReadStream("test.txt",
    {encoding: "utf-8", highWaterMark: 24   }
)
const writableStream = fs.createWriteStream("output1.txt",
    {encoding: "utf-8"}
)
readableStream.on("open",()=>{
    console.log("The stream is now open")
})
readableStream.on("ready",()=>{
    console.log("The stream is now ready to be read")
})
readableStream.on("data",(chunk)=>{
    console.log("Received chunk:",chunk)
})
readableStream.on("end",()=>{
    console.log("No more data to read, stream ended")
})
readableStream.on("close",()=>{
    console.log("The stream has been closed")
})

// 2:
readableStream.on("data",(chunk)=>{
    writableStream.write(chunk)
})

// 3:
readableStream.pipe(writableStream)
writableStream.on("finish",()=>{
    console.log("All data has been written to output.txt")
})  