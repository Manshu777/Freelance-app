import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    flex: 1,
  },
  header: {
    backgroundColor: '#DE1F26',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingTop: 35,
    paddingBottom: 15,
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  backButtonIcon: {
    height: 20,
    width: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
  },
  filterIcon: {
    height: 20,
    width: 20,
  },
  SearchandOptions: {
    flex: 0,
    flexDirection: 'column',
    borderColor: 'cyan',
    borderWidth: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
  },
  Searchinput: {
    flex: 0,
    marginLeft: 10,
    fontSize: 16,
    width: width * 0.78,
    backgroundColor: '#F6F7F9',
    borderRadius: 10,
    paddingLeft: 15,
    paddingVertical: 5,
    color: '#000',
  },
  chessButtonContainer: {
    flex: 0,
    flexDirection: 'row',
    paddingHorizontal: 10,
    paddingTop: 10,
    paddingBottom: 15,
    gap: 10,
  },
  backarrowimg: {
    width: 35,
    height: 35,
  },

  chessButtons: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 20,
    marginHorizontal: 5,
    marginBottom: 10,
  },
  chessButtonText: {
    fontSize: 16,
    color: '#000',
  },
  navigationContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 65, 
    backgroundColor: '#fff',
    // borderTopWidth: 1,
    // borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
