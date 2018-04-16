import React, { Component } from 'react';
import { ListView } from 'react-native';
import QuestListItem from './QuestListItem';
import { Spinner } from './common';


class QuestList extends Component {

    /*Fungerar som listan i tech stack, men eftersom vi använder 
    didMount istället för willMount har vi även lokal state för att
    jobba med renderfunktionen. setState triggar renderfunktionen
    och renderfunktionen tittar på state.dataLoaded. */

    state = { dataLoaded: false }

    componentDidMount() {
        //Våra initiala quests för testning.
        this.createDataSource(
            {
                quest1: {
                    id: 123,
                    title: 'Pelles Vandring',
                    description: 'Hjälp Pelle hitta sin svans.',
                    clue: 'Domkyrkan',
                    marker: {
                        latitude: 59.8542202,
                        longitude: 17.6319526
                    }           
                },
                quest2: {
                    id: 456,
                    title: 'Patriks utekväll',
                    description: 'Hjälp Patrik till nästa bar, han är törstig.',
                    clue: 'ÖG',
                    marker: {
                        latitude: 59.8557375,
                        longitude: 17.6360675
                    }
                }
            });
    }

    createDataSource(quests) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(quests);
        this.setState({ dataLoaded: true });
    }

    renderRow(questData) {
        return (
            <QuestListItem quest={questData} />
        );
    }


    render() {
        if (this.state.dataLoaded) {
            return (
                <ListView
                    enableEmptySections
                    dataSource={this.dataSource}
                    renderRow={this.renderRow}
                />
            );
        }
        return (
            <Spinner />
        );
    }

}


export default QuestList;
