import {StyleSheet, Dimensions} from 'react-native';

const {width, height} = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    width: width * 1,
  },
  imagedesign: {
    flex: 0,
    width: width * 1,
    height: height * 0.48,
    paddingTop: 78,
    position: 'relative',
  },
  Cirdes: {
    height: 458,
    width: 458,
    backgroundColor: '#FFB900',
    borderBottomColor: 150,
    position: 'absolute',
    top: -256,
    right: -284,
    borderRadius: 250,
  },
  imagebox: {
    flex: 0,
    alignItems: 'center',
    flexDirection: 'row',
    height: height * 0.2,
    height: height * 0.35,
    justifyContent: 'center',
  },
  boxdes: {
    height: 100,
    width: 67,
    backgroundColor: '#D9D9D9',
  },
  image: {
    resizeMode: 'contain',
    width: 300,
  },
  singin: {
    flex: 0,
    justifyContent: 'space-between',
    height: height * 0.53,
    backgroundColor: 'rgba(126,88,199,1)',
    width: '100%',
    paddingHorizontal: 35,
    paddingVertical: 20,
    borderTopRightRadius: 35,
    borderTopLeftRadius: 35,
    position: 'absolute',
    bottom: 0,
  },
  singinCont: {
    flex: 1,
    justifyContent: 'space-between',
  },
  welcomeText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: -10,
  },
  MobileNo: {
    color: '#fff',
    fontSize: 14,
  },
  textdecor: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#fff',
    marginHorizontal: 10,
  },
  Login: {
    fontSize: 16,
    fontWeight: '500',
    color: '#fff',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#fff',
    borderRadius: 10,
    paddingVertical: 5,
    paddingLeft: 20,
    marginBottom: 10,
    backgroundColor: '#fff',
  },
  countrySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 10,
    borderColor: '#808080',
    borderRightWidth: 1,
  },
  flag: {
    width: 30,
    height: 20,
    marginRight: 10,
  },

  countryCode: {
    fontSize: 16,
    marginRight: 5,
    color: '#000',
  },
  downicon: {
    width: 15,
    height: 10,
  },
  Inputnumber: {
    marginLeft: 10,
    width: width * 0.475,
    color: '#808080',
  },
  InputEmail: {
    width: '95%',
    color: '#808080',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  modalContent: {
    width: '100%',
    maxHeight: height * 0.53,
    backgroundColor: 'white',
    borderRadius: 35,
    padding: 20,
    elevation: 5,
  },
  countryOption: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  countryName: {
    marginLeft: 10,
    fontSize: 16,
    color: '#000',
  },
  closeButton: {
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    fontSize: 16,
    color: 'blue',
  },

  SendOTP: {
    backgroundColor: '#FFB900',
    borderRadius: 15,
    paddingVertical: 19.58,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#000',
    fontSize: 16,
    fontWeight: '500',
  },
  ContWithEmail: {
    flex: 0,
    flexDirection: 'row',
    borderRadius: 15,
    paddingVertical: 19.58,
    paddingHorizontal: 20,
    borderColor: '#fff',
    borderWidth: 1,
  },
  icon: {
    width: 24,
    height: 24,
  },

  buttonEmail: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
    textAlign: 'center',
    width: width * 0.6,
  },
  termsText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'left',
    marginTop: 15,
  },
  linkText: {
    color: '#FFB900',
    textDecorationLine: 'none',
  },

  // code for

  otpContainer: {
    flex: 0,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 10,
  },
  otpInput: {
    borderColor: 'white',
    borderWidth: 1,
    height: 47.5,
    width: 47.5,
    borderRadius: 10,
    fontSize: 24,
    textAlign: 'center',
    color:'white',
  },
  verifyButton: {
    backgroundColor: '#FFB900',
    borderRadius: 15,
    paddingVertical: 19.58,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '100%',
    color: '#000',
  },
});

export default styles;
