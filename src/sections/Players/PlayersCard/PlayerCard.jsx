import CardHover from "components/cardHover";
import PlayerCardStyleWrapper from "./PlayerCard.style";
import fbIcon from "assets/images/icons/facebook.svg";
import linkedIcon from "assets/images/icons/linkedin.svg";
import twitterIcon from "assets/images/icons/twitter.svg";
import discordIcon from "assets/images/icons/discord.svg";
import userDefault from "assets/images/no-User.png";
import { Link } from "react-router-dom";

const PlayerCard = (props) => {
  return (
    <PlayerCardStyleWrapper>
      <Link to={`/player/${props.id}`} state={{ playerId: props.id }}>
        <div className="player-info">
          <div className="player-logo">
            <img
              src={props.image || userDefault}
              alt="player-image"
              className="player-image"
              onError={(e) => {
                if (e.target.src !== userDefault) {
                  e.target.src = userDefault;
                }
              }}
            />
          </div>
          <div className="player-detail">
            <h4>
              {props.firstname} {props.lastname}
            </h4>
            <div className="mt-3">{props.country}</div>
            <div className="mt-3">{props.email}</div>
            <div className="mt-3">{props.top_points}</div>
          </div>
        </div>
      </Link>
      <div className="links">
        <a href={props.discord}>
          <img src={discordIcon} alt="icon" />{" "}
        </a>
        <a href={props.twitter}>
          <img src={twitterIcon} alt="icon" />{" "}
        </a>
        <a href={props.facebook}>
          <img src={fbIcon} alt="icon" />{" "}
        </a>
        <a href={props.linkedin}>
          <img src={linkedIcon} alt="icon" />{" "}
        </a>
      </div>

      <CardHover />
    </PlayerCardStyleWrapper>
  );
};

export default PlayerCard;
