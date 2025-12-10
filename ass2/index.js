import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import EventEmitter from "events";
import os from "os";

// const getFilePath = () => {

//     const filePath = fileURLToPath(import.meta.url);
//     const dirPath = path.dirname(filePath);

//     return { File: filePath, Dir: dirPath };
// };

// console.log(getFilePath());

// const fileName = (filepath) => {

//     return path.basename(filepath);
// }
// console.log('File Name:', fileName("/home/user/docs/file.txt"));

// function buildPath(obj) {
//     return path.format(obj);
// }

// console.log(buildPath({ dir: "folder", name: "app", ext: ".js" }));

// const fileExtension = (filepath) => {
//     return path.extname(filepath);
// }
// console.log('File Extension:', fileExtension("/docs/readme.md"));

// const parsePath = (filepath) => {
//     const ext = path.extname(filepath);
//     const file = path.basename(filepath, ext);
//     return{ base: file, ext: ext };
// }
// console.log('Parsed Path:', parsePath("/home/user/docs/file.txt"));

// const isabsolutePath = (filepath) => {
//     return path.isAbsolute(filepath);
// }
// // console.log('Is Absolute Path:', isabsolutePath("/home/user/docs/file.txt"));

// const joinPaths = (pathsArray) => {
//     return path.join(...pathsArray);
// }
// // console.log('Joined Path:', joinPaths(["src","components", "App.js"]));

// const absolutePath = (filepath) => {
//     return path.resolve(filepath);
// }
// console.log('Resolved Absolute Path:', absolutePath("./index.js"));

// const join2Paths = (path1, path2) => {
//     return path.join(path1, path2);
// }
// console.log('Joined Paths:', join2Paths("/folder1", "folder2/file.txt"));

// const deleteFile = (filepath) => {
//     fs.unlink(filepath, (err) => {
//         if (err) {
//             console.error('Error deleting file:', err);
//             return;
//         } }  )
//     console.log(`File at ${filepath} has been deleted.`);
// }

// deleteFile("./temp.txt");

// function makeDir(folderName) {
//   try {
//     fs.mkdirSync(folderName);
//     return "Success";
//   } catch (err) {
//     return "Failed: " + err.message;
//   }
// }

// console.log(makeDir("myFolder"));

// const emitter = new EventEmitter();

// emitter.on("start", () => {
//   console.log("Welcome event triggered!");
// });
// emitter.emit("start");

// emitter.on("login", (name) => {
//   console.log(`User Logged in: ${name}.`);
// });
// emitter.emit("login", "Ahmed");

// const readFile = (filepath) => {
//   try {
//     const data = fs.readFileSync(filepath, "utf-8");
//     return data;
//   } catch (err) {
//     console.error("Error reading file:", err);
//     return null;
//   }
// };

// console.log(readFile("./notes.txt"));

// const writeFile = (filepath, content) => {
//   fs.writeFile(filepath, content, "utf-8", (err) => {
//     if (err) {
//       console.error("Error writing file:", err);
//     } else {
//       console.log("File written successfully!");
//     }
//   });
// };

// writeFile("./async.txt", "Async save");

// const directoryExists = (path) => {
//   try {
//     return fs.existsSync(path)
//   } catch (err) {
//     console.error("Error checking directory:", err);
//     return false;
//   }
// };

// console.log(directoryExists("./notes.txt"));

const osInfo = () => {
  return {
    platform: os.platform(),
    Arch: os.arch(),
  };
};
console.log(osInfo());