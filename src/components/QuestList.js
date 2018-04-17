import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import QuestListItem from './QuestListItem';
import { questsFetch, selectQuest, discardQuests } from '../actions';
import { Spinner } from './common';


class QuestList extends Component {

    /*Fungerar som listan i tech stack, men eftersom vi använder
    didMount istället för willMount har vi även redux state för att
    jobba med renderfunktionen. discardQuests i componentWillUnmount togglar this.props.dataLoaded
    och renderfunktionen tittar på this.props.dataLoaded. */

    componentWillMount() { //Ev byta till didMount.
        this.props.discardQuests();
        this.props.questsFetch();
        this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
      this.createDataSource(nextProps);
    }

    createDataSource({ quests }) {
        const ds = new ListView.DataSource({
          rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.dataSource = ds.cloneWithRows(quests);
    }

    renderRow(questData) {
        return (
            <QuestListItem quest={questData} />
        );
    }


    render() {
        if (this.props.dataLoaded) {
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

const mapStateToProps = ({ selected }) => {
  const { dataLoaded } = selected;
  const quests = _.map(selected.quests, (val) => {
    return { ...val };
  });
  return { quests, dataLoaded };
};


export default connect(mapStateToProps, { questsFetch, selectQuest, discardQuests })(QuestList);
