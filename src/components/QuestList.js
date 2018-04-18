import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import QuestListItem from './QuestListItem';
import { questsFetch, selectQuest } from '../actions';
import { Spinner } from './common';


class QuestList extends Component {
//Här fär vi ev byta till componentDidMount() senare

    componentWillMount() {
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
/*
Ev att vi vill byta namn på selected. det kommer från index.js i reducers. _.map kommer från
lodash och lägger in all quest-objekt i quests som är en array av objekt
*/

const mapStateToProps = ({ selected }) => {
  const { dataLoaded } = selected;
  const quests = _.map(selected.quests, (quest) => {
    return { ...quest };
  });
  return { quests, dataLoaded };
};


export default connect(mapStateToProps, { questsFetch, selectQuest })(QuestList);
