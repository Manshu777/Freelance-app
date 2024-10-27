import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  HomeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: '',
    padding:0,
    margin:0,
  },
  Userprofile: {
    flex: 0,
    width: width * 1,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    flexDirection: 'row',
    borderColor: '#808080',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  ProfileDet: {
    flex: 0,
    flexDirection: 'row',
    gap: 10,
  },
  imageShadoweff: {
    height: 50,
    width: 50,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 5,
    borderRadius: 50,
  },
  dp: {
    height: 50,
    width: 50,
    borderRadius:50,
  },
  UserDetails: {
    flex: 0,
    alignItems: 'flex-start',
    justifyContent: 'space-evenly',
  },
  UserName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
  },
  UserLocation: {
    fontSize: 12,
    fontWeight: 'light',
    color: 'black',
  },
  bellIconDes: {
    marginTop: 5,
    position: 'relative',
  },
  BellIcon: {
    height: 25,
    width: 25,
  },
  NotiDot: {
    height: 7.5,
    width: 7.5,
    backgroundColor: 'red',
    position: 'absolute',
    bottom: 2.5,
    right: 5,
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background
  },
  modalContent: {
    width: '80%',
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  notificationText: {
    marginVertical: 5,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#386BF6',
    borderRadius: 5,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },

  //   this section is for scrolling images

  carouselContainer: {
    height: 200,
    width: '95%',
    // width: width * 1,
    marginHorizontal: 'auto',
    marginTop: 15,
    marginBottom: 5,
    marginLeft:'1%',
    overflow: 'hidden',
    borderRadius: 10,
  },
  imageContainer: {
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: "100%",
    height: '100%',
    resizeMode: 'cover',
    zIndex: 0,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    flexDirection: 'row',
  },
  dot: {
    width: 10,
    height: 10,
    padding: 2.5,
    borderRadius: 8,
    marginHorizontal: 5,
    borderColor: '#fff',
    // borderColor:'#001B7A',
    borderWidth: 1,
  },

  activeDot: {
    backgroundColor: 'white',
  },

  //   Your Daily Guide Style
  GuideSection: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 15,
    paddingHorizontal: 10,
    width: width * 1,
    // backgroundColor:"blue",
  },
  GuideHeading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
  },
  GuidePara: {
    color: '#5C5C5C',
    fontSize: 16,
    paddingVertical: 10,
  },
  GuideCards: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.95,
    flexDirection: 'row',
    paddingVertical: 15,
    gap:15,
  },
  GuideCard: {
    flex: 0,
    width:120,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    marginHorizontal:5,
    marginBottom:10,
    paddingVertical: 25,
    paddingHorizontal: 22.5,
    color: 'black',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  GuideCardImg: {
    height: 71,
    width: 71,
  },
  GuideText: {
    color: 'black',
  },

  //   Get In Touch
  ContactCards: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    width: width * 0.95,
    flexDirection: 'row',
    paddingVertical: 0,
    backgroundColor: '#FFF0E6',
    borderRadius: 10,
    marginTop: 15,
  },
  ContactCard: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 15,
    paddingVertical: 25,
    paddingHorizontal: 12.5,
  },
  ImageShadEff: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 65,
    width: 65,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 0,
  },
  ContactCardImg: {
    height: 40,
    width: 40,
  },
  ContactText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },

  
  CoachSection: {
    flex: 1,
    flexDirection: 'column',
    paddingVertical: 15,
    paddingHorizontal: 0,
    width: width * 1,
  
  },
  CoachHeading: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 20,
    paddingLeft: 10,
  },
  CoachCards: {
    // width:width * 1,
  },
  CoachCard: {
    marginVertical: 20,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 25,
    gap: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 5,
    backgroundColor: 'white',
    marginHorizontal: 7.5,
    borderRadius: 10,
  },
  CoachCardImg: {
    height: 100,
    width: 100,
    borderRadius: 70,
  },
  CoachName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
  CoachGame: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#727272',
  },
  CoachText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  CoachConnect: {
    backgroundColor: '#0050C8',
    paddingHorizontal: 17.5,
    paddingVertical: 7.5,
    borderRadius: 20,
  },
  CoachConnecttext: {
    color: 'white',
  },

  // Finance Section Style
  FinanceSection: {
    width: width * 1,
    flex: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
  },
  FinanceHeading: {
    flex: 0,
    gap: 5,
  },
  FinanceText: {
    fontSize: 16,
    fontWeight: '700',
    color: 'black',
  },
  FinanceStu: {
    color: '#E1353C',
  },
  FinancePara: {
    fontSize: 14,
    fontWeight: '400',
    color: '#515151',
  },
  FinanceImage: {
    height: 100,
    width: 100,
  },

  // Our Students
  StuCards: {
    flex: 0,
    width: width * 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
  },

  StuCard: {
    marginVertical: 0,
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 10,
    gap: 0,
    borderRadius: 10,
  },
  StuCardImgShad: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    height: 132,
    width: 116,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 4,
  },
  StuCardImg: {
    height: 132,
    width: 116,
    borderRadius: 10,
  },
  StuName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginTop: 15,
    marginBottom: 2.5,
  },
  StuGame: {
    fontSize: 14,
    fontWeight: 'regular',
    color: '#727272',
  },

  // Coach card Styles

  CoachListSection: {
    paddingHorizontal: 0,
    paddingTop: 15,
    gap: 15,
  },
  CoachSectionHead: {
    color: 'black',
    fontSize: 18,
    fontWeight: 'bold',
    paddingLeft:10,
  },


  CoachCards: {
    width:'100%'
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

  // Coach card Buttons
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
});

export default styles;
