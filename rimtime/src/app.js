'use strict';

// ------------------------------------------------------------------
// APP INITIALIZATION
// ------------------------------------------------------------------

const { App } = require('jovo-framework');
const { Alexa } = require('jovo-platform-alexa');
const { JovoDebugger } = require('jovo-plugin-debugger');
const { FileDb } = require('jovo-db-filedb');

const app = new App();

app.use(
    new Alexa(),
    new JovoDebugger(),
    new FileDb()
);


// ------------------------------------------------------------------
// APP LOGIC
// ------------------------------------------------------------------

app.setHandler({
    LAUNCH() {
        this.$alexaSkill.addDirective({
            type: 'Alexa.Presentation.APL.RenderDocument',
            version: '1.0',
            document: require(`./apl/quest-list/document.json`), // List of available quests
            datasources: require(`./apl/quest-list/data-sources.json`),
        })
        this.ask("Time to pick a quest! Defeat the dragon, race to the mountain top, or explore caves")
    },
    ShowTemplateIntent() {
        let template = this.$inputs.template;

        // Retrieve document and data from folder
        this.$alexaSkill.addDirective({
              type: 'Alexa.Presentation.APL.RenderDocument',
              version: '1.0',
              document: require(`./apl/${template.id}/document.json`),
              datasources: require(`./apl/${template.id}/data-sources.json`),
        });
        this.ask("Please say another APL template to view APL. Otherwise, say END to exit now.")
    }
});


module.exports.app = app;
