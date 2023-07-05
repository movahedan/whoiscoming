const fs = require('fs');

module.exports = (plop) => {
  plop.setActionType(
    'add-export-statement-to-root-index',
    function (answers, config) {
      const componentName = answers['name'];
      const componentType = answers['type'];
      const filePath = `${config.path}/${componentType}/index.ts`;

      const fileContent = fs.readFileSync(filePath, 'utf8');

      const sortedExportStatements = [
        ...fileContent.split('\n'),
        `export * from './${componentName}';`,
      ]
        .sort()
        .slice(1);

      fs.writeFileSync(filePath, `${sortedExportStatements.join('\n')}\n`);
    }
  );

  plop.setGenerator('component', {
    description: 'Generate a new component',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: 'What is the name of your component?',
      },
      {
        type: 'list',
        name: 'type',
        message: 'What is the type of your component?',
        choices: ['atoms', 'molecules', 'organisms', 'templates'],
      },
    ],
    actions: [
      {
        type: 'add',
        path: '../src/libs/ui/{{type}}/{{name}}/index.ts',
        templateFile: './component.index.ts.hbs',
      },
      {
        type: 'add',
        path: '../src/libs/ui/{{type}}/{{name}}/{{name}}.tsx',
        templateFile: './component.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/libs/ui/{{type}}/{{name}}/{{name}}.test.tsx',
        templateFile: './component.test.tsx.hbs',
      },
      {
        type: 'add',
        path: '../src/libs/ui/{{type}}/{{name}}/{{name}}.module.css',
        templateFile: './component.module.css.hbs',
      },
      {
        type: 'add-export-statement-to-root-index',
        path: 'src/libs/ui',
      },
    ],
  });
};
