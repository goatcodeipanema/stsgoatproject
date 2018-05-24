import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView, View } from 'react-native';
import QuestListItem from '../QuestListItem';
import { questsFetch, questsDiscard, selectQuest, searchChange } from '../../actions';
import { Spinner, SearchBar, Card, CardSection, Button } from '../common';


class QuestList extends Component {

  /*Sökfunktioen är ful men verkar funka. Borde lägga till respons om
    sökningen inte gav några resultat.
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
    //om sökningen har gett resultat sätts datasource till searcharrayen.
    //om sökningen inte gav något resultat visas en tom lista
    //annars är datasource samma som skapas i createdatasource
    getDataSource() {
      if (this.props.searchResult.length > 0) {
        return this.dataSource.cloneWithRows(this.props.searchResult);
      } else if (this.props.searchResult.length === 0 && this.props.search !== '') {
        console.log('no quests matched your search');
        //det här vill vi kanske skriva ut i appen istället
        return this.dataSource.cloneWithRows([]);
      }
        return this.dataSource;
    }
    //filtrerar sökningen och returnerar de quests där title/id matchar

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
      //Älskar trubbiga timeouts
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
    //renderSeparator ger streck mellan listItems
    render() {
        if (this.props.dataLoaded) {
            return (
              <Card>
                <CardSection>
                  <SearchBar
                  onChangeText={this.onSearchChange.bind(this)}
                  placeholder='Search...'
                  />
                  <Button onPress={this.reloadList.bind(this)}>
                    Reload
                  </Button>
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
    marginTop: 10,
  },

  backgroundStyle: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
};
/*
Ev att vi vill byta namn på selected. det kommer från index.js i reducers. _.map kommer från
lodash och lägger in all quest-objekt i quests som är en array av objekt
*/

const mapStateToProps = ({ selected }) => {
  const { dataLoaded, searchResult, search } = selected;
  const quests = _.map(selected.quests, (quest) => {
    return { ...quest };
  });
  return { quests, dataLoaded, searchResult, search };
};


export default connect(mapStateToProps, { questsFetch, questsDiscard, selectQuest, searchChange })(QuestList);
