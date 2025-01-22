import PropTypes from 'prop-types';
import crispyRoll from '../../assets/크리스피롤.jpg';
import potatoCrisp from '../../assets/포테이토크리스프.jpg';
import lotus from '../../assets/로토스.jpeg'

const ImageBox = ({ item }) => {
    const itemImageMap = {
        '크리스피롤': crispyRoll,
        '포테이토 크리스프': potatoCrisp,
        '로토스': lotus,
    };

    const itemImage = itemImageMap[item];

    return (
            <div>
                {itemImage ? (
                    <img src={itemImage} alt={`${item} 이미지`} style={{ width: '80px' }} />
                ) : (
                    <ion-icon name="cube-outline" style={{ fontSize: '45px', color: '#cecece' }}></ion-icon>
                )}
            </div>
    );
};

ImageBox.propTypes = {
    item: PropTypes.string.isRequired,
};

export default ImageBox;
