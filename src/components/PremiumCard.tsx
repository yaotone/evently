import "./PremiumCard.css"
import check from "../assets/check.png"

export default function PremiumCard(){
    return(
        <div className="PremiumCard">
            <h1 className="PremiumCard_header">Бесплатная</h1>
            <small className="PremiumCard_price" style={{height:`fit-content`}}>0 руб/мес</small>
            <div className="PremiumCard_feature">
                <img src={check} alt="check" className="PremiumCard_feature_icon"/>
                <div className="PremiumCard_feature_text">Преимущество</div>
            </div>
            <div className="PremiumCard_feature">
                <img src={check} alt="check" className="PremiumCard_feature_icon"/>
                <div className="PremiumCard_feature_text">Преимущество</div>
            </div>
            <div className="PremiumCard_feature">
                <img src={check} alt="check" className="PremiumCard_feature_icon"/>
                <div className="PremiumCard_feature_text">Преимущество</div>
            </div>
            <div className="PremiumCard_feature">
                <img src={check} alt="check" className="PremiumCard_feature_icon"/>
                <div className="PremiumCard_feature_text">Преимущество</div>
            </div>
            <div className="PremiumCard_buy"><h1>Купить</h1></div>
        </div>
    )
}