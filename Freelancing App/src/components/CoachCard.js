import {
  Image,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  Dimensions,
} from 'react-native';
import Education from '../assets/images/Education.png';
import Verifyed from '../assets/images/Verifyed.png';
import Star from '../assets/images/Star.png';
import Exp from '../assets/images/Exp.png';
import Lang from '../assets/images/Lang.png';
import styles from '../styles/HomeStyle';

const {width} = Dimensions.get('window');

const CoachCard = ({coach}) => {
  const {
    name,
    rating,
    verified,
    coachImage,
    skills,
    languages,
    experience,
    buttons,
  } = coach;

  const renderButton = ({item}) => (
    <TouchableOpacity style={styles.CoachButtons} activeOpacity={0.7}>
      <Image source={item.image} style={styles.CoachButtIcon} />
      <Text style={styles.buttTextCoach}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderLimitedList = (items, maxCount, isSports = false) => {
    if (items.length > maxCount) {
      const displayedItems = items.slice(0, maxCount);
      const remainingCount = items.length - maxCount;
      return (
        <>
          {displayedItems.join(', ')}
          {isSports ? ' and ' : ', '}
          <Text style={{color: '#00A9C0'}}>+{remainingCount} More</Text>
        </>
      );
    } else {
      return items.join(', ');
    }
  };

  return (
    <View style={styles.CoachCards}>
      <View style={styles.CoachDetails}>
        <View style={styles.CoachImgSection}>
          <Image source={coachImage} style={styles.CoachImage} />

          <View style={styles.Coachrating}>
            <Image source={Star} style={styles.RatingStar} />

            <Text style={styles.RatingNumber}>{rating}</Text>
          </View>
        </View>

        <View style={{flex: 0, gap: 10}}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: width * 0.54,
              marginTop: 5,
            }}>
            <Text style={{color: 'black', fontSize: 18, fontWeight: '600'}}>
              {name}
            </Text>
            {verified && (
              <Image source={Verifyed} style={{width: 25, height: 25}} />
            )}
          </View>

          <View style={{flex: 0, gap: 7.5}}>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image source={Education} style={{width: 20, height: 20}} />
              <Text
                style={{color: '#616161', width: width * 0.5, fontSize: 16}}>
                {renderLimitedList(skills, 4, true)}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image source={Lang} style={{width: 20, height: 20}} />
              <Text
                style={{color: '#616161', width: width * 0.5, fontSize: 16}}>
                {renderLimitedList(languages, 3)}
              </Text>
            </View>

            <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
              <Image source={Exp} style={{width: 20, height: 20}} />
              <Text
                style={{color: '#616161', width: width * 0.5, fontSize: 16}}>
                {experience}
              </Text>
            </View>
          </View>
        </View>
      </View>

      <View style={{marginTop: 15}}>
        <FlatList
          data={buttons}
          renderItem={renderButton}
          keyExtractor={item => item.id}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </View>
  );
};

export default CoachCard;
