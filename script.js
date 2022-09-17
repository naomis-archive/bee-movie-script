import { readFile } from 'fs/promises';
import { join } from 'path';
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

(async () => {
    console.log("Starting!");
    const script = await readFile(join(process.cwd(), "script.txt"), "utf8");
    const lines = script.split("\n");
    const reversedForCommitHistory = lines.reverse();

    for (const line of reversedForCommitHistory) {
        await execAsync(`git commit --allow-empty -m "${line}"`);
    }
    console.log("Push those changes!!");
})();