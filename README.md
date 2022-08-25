# Athena Experiential Learning Application

## Description

Provide a short description explaining the what, why, and how of your project. Use the following questions as a guide:

- What was your motivation?
  To imporove on the experiential learning system with University Partnerships, reducing the load on Educators while streamlining the interactions between Students, Partners, and Educators.

## Table of Contents (Optional)

If your README is long, add a table of contents to make it easy for users to find what they need.

- [Installation](#installation)
- [Folder Structure](#structure)
- [Usage](#usage)
- [Credits](#credits)
- [License](#license)

## Installation

What are the steps required to install your project? Provide a step-by-step description of how to get the development environment running.

There are two parts to this project, a front-end (/client) and a back-end (/server).

To start the front-end please run the command for local development.

```
cd client && npm i && npm run dev
```

To start the back-end please run the command for local development.

```
cd server && npm i && npm run start
```

## Structure

In the client folder we have a Next.js folder structure.

The .next folder has next configurations, the out folder has prod files that are SSR via our server to deployment.

In the src/components folder we have React components organized by folders representing the page they're used in.

In the src/pages folder we have our main pages - note that routing is auto-setup by next based on naming of files/folders in this directory. Basically, sub-folders are sub-directories and files are end-paths, with dynamic paths taken care of by naming convention [project_name] for example.

## Usage

The client build system uses Next.js to streamline and effectively speed up the building process, all while allowing hot-reloading during client (front-end) development.



## Credits

Tevan Bhatia (https://github.com/TevanB) (https://tevanb.com)

## License

The last section of a high-quality README file is the license. This lets other developers know what they can and cannot do with your project. If you need help choosing a license, refer to [https://choosealicense.com/](https://choosealicense.com/).

---

🏆 The previous sections are the bare minimum, and your project will ultimately determine the content of this document. You might also want to consider adding the following sections.

## Badges

![badmath](https://img.shields.io/github/languages/top/lernantino/badmath)

Badges aren't necessary, per se, but they demonstrate street cred. Badges let other developers know that you know what you're doing. Check out the badges hosted by [shields.io](https://shields.io/). You may not understand what they all represent now, but you will in time.

## Features

If your project has a lot of features, list them here.

## Tests

Go the extra mile and write tests for your application. Then provide examples on how to run them here.

## Template Credits:

https://coding-boot-camp.github.io/full-stack/github/professional-readme-guide
