import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {width: width * 1,backgroundColor:'#fff'},

  maincontainer: {
    width: width * 1,
  },
  header: {
    width: '100%',
    backgroundColor: '#DE1F26',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingHorizontal: 10,
    paddingTop: 35,
    gap: 15,
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
    fontSize: 22,
  },
  filterIcon: {
    height: 20,
    width: 20,
  },

  // coach card
  CoachCards: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 15,
    width: width * 0.95,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  CoachDetails: {
    flex: 0,
    flexDirection: 'row',
    gap: 20,
  },
  CoachImgSection: {
    position: 'relative',
  },
  CoachImage: {
    height: 160,
    aspectRatio: 4 / 5,
    borderRadius: 10,
  },
  Coachrating: {
    gap: 5,
    flex: 0,
    left: 28,
    bottom: -10,
    borderRadius: 15,
    paddingVertical: 5,
    flexDirection: 'row',
    position: 'absolute',
    paddingHorizontal: 10,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  RatingStar: {
    width: 20,
    aspectRatio: 1,
  },
  RatingNumber: {
    fontSize: 16,
    color: 'black',
  },
  CoachButtons: {
    gap: 5,
    elevation: 4,
    borderRadius: 25,
    shadowRadius: 4,
    shadowOpacity: 0.3,
    marginVertical: 10,
    paddingVertical: 10,
    shadowColor: '#000',
    alignItems: 'center',
    flexDirection: 'row',
    marginHorizontal: 5,
    paddingHorizontal: 20,
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 1,
    },
  },
  CoachButtIcon: {
    width: 22.5,
    aspectRatio: 1,
  },
  buttTextCoach: {
    color: '#157B11',
    fontSize: 16,
    fontWeight: '400',
  },
  containerDetails: {
    flex: 1,
    padding: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  button: {
    padding: 10,
    backgroundColor: '#D3D3D3',
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#000',
  },
  activeButton: {
    backgroundColor: '#386BF6',
  },
  activeButtonText: {
    color: '#FFF',
  },
  contentContainer: {
    marginTop: 20,
  },
  contentText: {
    color: 'black',
    fontSize: 16,
  },
  coachContainer: {
    marginBottom: 10,
  },
  categoryText: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 5,
  },
  descriptionText: {
    fontSize: 16,
    color: '#555',
  },
  expertiseText: {
    fontSize: 16,
    color: '#333',
    marginTop: 5,
  },
  certificateContainer: {
    marginVertical: 10,
    alignItems: 'center',
    backgroundColor:'red'
  },
  certificateImage: {
    marginBottom: 0,
  },
  imageDescription: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
  },
  awardContainer: {
    marginVertical: 10,
  },
  titleText: {
    color:'black',
    fontSize: 18,
    fontWeight: 'bold',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
    gap:5
},
dotButContainer: {
    alignItems:'center',
    justifyContent:'center',
    width: 15.5,
    height: 15.5,
    borderRadius:15,
    borderColor: '#001B7A',
    borderWidth: 1.5,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 5,
    backgroundColor: '#ffffff00',
    marginHorizontal: 5,
  },
  activeDot: {
    backgroundColor: '#001B7A',
  },
  imageNavigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  navButtonText: {
    fontSize: 16,
    color: 'black',
  },
});

export default styles;
