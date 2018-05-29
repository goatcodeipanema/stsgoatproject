import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import QuestListItem from '../QuestListItem';
import { questsFetch, questsDiscard, selectQuest, searchChange } from '../../actions';
import { Spinner, SearchBar, Card, CardSection, ImageButton } from '../common';

const blueButton = require('../../pictures/blueButton.png');


class QuestList extends Component {
  /*
  Just a list with all the quests from firebase. QuestListItem contains some more questlist stuff.
  */

  componentWillMount() {
    if (!this.props.dataLoaded) {
      this.props.questsFetch();
    }
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.createDataSource(nextProps);
  }

  onSearchChange(text) {
    this.props.searchChange(text, this.searchFilter(text));
  }

  /*
  If search has results the datasource is set to the searcharray.
  No search results returns empy list, and else the datasource 
  is the same as in createDataSource.
  */
  getDataSource() {
    if (this.props.searchResult.length > 0) {
      return this.dataSource.cloneWithRows(this.props.searchResult);
    } else if (this.props.searchResult.length === 0 && this.props.search !== '') {
      console.log('no quests matched your search');  //Would be nice for the user to see this message instead.
      return this.dataSource.cloneWithRows([]);
    }
      return this.dataSource;
  }

  //Searches for title or ID
  searchFilter(text) {
      const searchResult = this.props.quests.filter((item) => {
      const upperCaseTitle = item.title.toUpperCase();
      const textData = text.toUpperCase();
      const upperCaseId = item.id.toUpperCase();
      return (upperCaseTitle.indexOf(textData) > -1 || upperCaseId.indexOf(textData) > -1);
    });
      return searchResult;
  }

  reloadList() {
    this.props.questsDiscard();
    setTimeout(() => {
      this.props.questsFetch();
    }, 1);
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
            <Card>
              <CardSection>
                <SearchBar
                onChangeText={this.onSearchChange.bind(this)}
                placeholder='Search...'
                />
                <ImageButton onPress={this.reloadList.bind(this)} source={blueButton}> Reload </ImageButton>


              </CardSection>

              <ListView
                  enableEmptySections
                  dataSource={this.getDataSource()}
                  renderRow={this.renderRow}
                  renderSeparator={(sectionId, rowId) =>
                    <View
                    key={rowId}
                    style={styles.separator}
                    />
                  }
              />
            </Card>
          );
      }
      return (
          <Card>
          <Spinner />

          </Card>

      );
  }
}
const styles = {
  separator: {
    backgroundColor: 'transparent',
    height: 5,
    marginTop: 5,
  },

  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
};

const mapStateToProps = ({ selected }) => {
  const { dataLoaded, searchResult, search } = selected;
  const quests = _.map(selected.quests, (quest) => {
    return { ...quest };
  });
  return { quests, dataLoaded, searchResult, search };
};


export default connect(mapStateToProps, { questsFetch, questsDiscard, selectQuest, searchChange })(QuestList);
