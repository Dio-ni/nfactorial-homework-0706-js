#!/usr/bin/env node


// /*
// /$$$$$$$$ /$$$$$$ / $$$$$$$ / $$$$$$$$ / $$$$$$ / $$ / $$ / $$$$$$ / $$$$$$$ / $$
// | $$_____/|_  $$_/| $$__  $$| $$_____/ /$$__  $$| $$  | $$|_  $$_/| $$__  $$|__/
// | $$        | $$  | $$  \ $$| $$      | $$  \__/| $$  | $$  | $$  | $$  \ $$ /$$  /$$$$$$
// | $$$$$     | $$  | $$$$$$$/| $$$$$   |  $$$$$$ | $$$$$$$$  | $$  | $$$$$$$/| $$ /$$__  $$
// | $$__/     | $$  | $$__  $$| $$__/    \____  $$| $$__  $$  | $$  | $$____/ | $$| $$  \ $$
// | $$        | $$  | $$  \ $$| $$       /$$  \ $$| $$  | $$  | $$  | $$      | $$| $$  | $$
// | $$       /$$$$$$| $$  | $$| $$$$$$$$|  $$$$$$/| $$  | $$ /$$$$$$| $$ /$$  | $$|  $$$$$$/
// |__/      |______/|__/  |__/|________/ \______/ |__/  |__/|______/|__/|__/  |__/ \______/
// */


import chalk from 'chalk';
import inquirer from 'inquirer';
import gradient from 'gradient-string';
import chalkAnimation from 'chalk-animation';
import figlet from 'figlet';
import { createSpinner } from 'nanospinner';

let member1 = {
  name:"Dayana",
  status:"student"
}
let member2 = {
  name:"Aruzhan",
  status:"student"
}
let member3 = {
  name:"Ardak",
  status:"student"
}
let member4 = {
  name:"Dalida",
  status:"the boss"
}
let member5 = {
  name:"Aidar",
  status:"mentor"
}
let team = [member1,member2,member3,member4,member5];

// (async ()=>{
//   await welcome();
// })();


// const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// async function welcome() {
//   console.log("??")
// }
// await welcome()

let playerName;
const welcomeMess = "Welcome to Dalida's The Best Team!" 
const sleep = (ms = 1000) => new Promise((r) => setTimeout(r, ms));

async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow(
    `${welcomeMess}\n`
  );

  await sleep();
  rainbowTitle.stop();

  console.log(`
    ${chalk.bgBlue('HOW TO PLAY')} 
    If you want you can find out if you or your friend 
    is  ${chalk.bgGreen('on the team')}  and what her/his ${chalk.bgGreen('status')}.
    You can also ${chalk.bgCyan('join ')} the team as a ${chalk.bgCyan('student')}. 
    
    
    0 - to see the list of members
    1 - to join the team 
    2 - to find by name
    -1 - end session
  `);
}


async function inputType() {
  
    let answer= await inquirer.prompt({
    name: 'input',
    type: 'input',
    message: 'Type command( 0/1/2/-1 ):',
    
  });
  
return checkAns(answer.input);
  
}


async function checkAns(answer) {
  const spinner = createSpinner('Checking answer...').start();
  await sleep();

  if (answer==0) {
    spinner.success({ text: `The list of memebers: ` });
    
    (async ()=>{
      await searchFun();
      await inputType();})();
  } else if(answer ==1){
    spinner.success({ text: `Input your name to join the team` });
    
    (async ()=>{
      await addToTeam();
      await inputType();})();
    
  }else if(answer==2){
    spinner.success({ text: `Enter name` });
    let name= await inquirer.prompt({
      name: 'nameToSearch',
      type: 'input',
      message: 'Type  name:',
    });
    (async ()=>{
      
      await searchByName(name.nameToSearch);
      await inputType();})();

  }else if(answer==-1){
    spinner.error({ text: `💀💀💀 End session` });
  }else{
    spinner.error({ text: `Invalid number!!! Try again. Enter 0 or 1 only!!` });
    (async ()=>{
      await inputType();})();

  }
}

async function addToTeam() {
  let name = await inquirer.prompt({
    name: 'nameToAdd',
    type: 'input',
    message: 'Type your name:',
  });
  
  let status = await inquirer.prompt({
        name: 'status',
        type: 'list',
        message: 'Choose status ( student/mentor/admin):\n',
        choices: ['student', 'mentor', 'admin'],
      });
//     let status = {
//     name: '',
//     type: '',
//     message: '',
//   };
//   while( status.status != 'student' ){//|| status.status != 'mentor' || status.status != 'admin'
// status = await inquirer.prompt({
//     name: 'status',
//     type: 'input',
//     message: 'Type your status ( student/mentor/admin):',
//   });
  //}
   
  let newMember = {
    name: name.nameToAdd,
    status:status.status
  } 
  team.push(newMember);
  }

async function searchFun(){
  console.info(team);
}
async function searchByName(nameToSearch){
  let nameAns = team.filter((team) => team.name === nameToSearch);
  
  console.log(nameAns.length ? nameAns : 'not found');
}

(async ()=>{
  await welcome();
  await inputType();
})();