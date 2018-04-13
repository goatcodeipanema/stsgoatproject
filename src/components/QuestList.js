import React, { Component } from 'react';
import { ListView } from 'react-native';
import QuestListItem from './QuestListItem';


class QuestList extends Component {

    componentWillMount() {
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
        //Griders standardkod
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
    
        this.dataSource = ds.cloneWithRows(quests);
    }

    renderRow(questData) {
        //Griders standardkod
        return (
            <QuestListItem quest={questData} />
        );
    }


    render() {
        //Griders standardkod
        return (
            <ListView
                enableEmptySections
                dataSource={this.dataSource}
                renderRow={this.renderRow}
            />
        );
    }

}


export default QuestList;
