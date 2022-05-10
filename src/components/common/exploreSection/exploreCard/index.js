import React from "react";
import "./exploreCard.css";

const ExploreCourseCard = ({ course }) => {
  console.log(course)
  const name = course?.title;
  console.log(name);
  var coverImg = ''
  var Url = ''
  var description = ''
  if (course.url){
    if (course?.url.includes("coursera")) {
      coverImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/9/97/Coursera-Logo_600x600.svg/1200px-Coursera-Logo_600x600.svg.png";
    }
    else{
      coverImg = course?.image;
    }
  }
  else{
    coverImg = course?.image;
  }
  var rating = course?.rating;
  if (rating > 5){
    rating = (rating / 100 ) * 5
    rating = rating.toFixed(1);
  }
  if (course.url){
    if (course?.url.includes("coursera")) {
      Url = course?.url;
    }
    else {
      Url = "https://www.udemy.com"+course?.url;
    }
  }
  else{
    Url = "https://www.udacity.com"
  }
  if(course.description){
    description = "" || course?.description;
  }
  else{
    description = name;
  }
  return (
    <div className={`explore-card cur-po explore-card-first`}>
      <div className="explore-card-cover">
        <a href={Url} target="_blank" rel="noopener noreferrer">
        <img 
          src={coverImg}
          className="explore-card-image"
          alt={name}
        />
        </a>
      </div>
      <div className="res-row">
        <div className="res-name">{name}</div>
        {rating && (
          <div className="res-rating absolute-center">
            {rating}  <i className="fi fi-sr-star absolute-center" />
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIsAAACECAMAAACXkSgYAAAAclBMVEX////eAADslZXbAAD++/v+9vb419f42tr53d3gJyf98/P86+v30dH1x8fyubn87u7namr64+PtmprxsbHiQ0PuoaHvpqbfMTH0wsLiTk7sj4/phYXjV1fmZWXxra3neXngOzvdFRXgICDfDg7lXl7lcHBVPubLAAAEbElEQVR4nM2c2YKCMAxFLQEVUNxQFHfR///FEQaVpYu0ofE+zzCHhrTpTTuDAYamLspjMORePWqEt8awpUZ4aw9zaoSXvB1LQmqIUkPGYEoNUSoFxn4lSD5j7PobWT1iuX4jk5YFy54aI5e7K1huvzDdhVCwwJAa5CmH/etMDfIM0aFkiQNqlMEoK1nYhBplsIESBegz6fIaFnalRgnhzQLUQVqzjxxaFPdYYYlp16QZVFhgQcpyqrKwlJSlGiLGdpRBWvg1FtLpLqqFiMGSkOVQHxbm06F40GAhzKQVa4ouSOcWy50qk4JmiJ5BotqzbTksayKWeQuFsQMNSphwWK4jEpYtB4XBiYSlnUW5YhKW9pdbDAzFno2TRYU2BCx7Pgp72EeZ+QIWZn+6mwhCxGBlnYWfRbnutlG8i5DFt104TIUojEWWWVIJy9Eyi+jLLb5euyhDKYvdIDkSFMsWVRBLWW4ziyxjWYgsO/KpnEXXkY9Sp7OWwrXoFaTuz3TSaOA50F0KlGeUusvJC59hpn5234KXVe2dqWHg/KkGV5n653tUVivYxzHd0MBl3MgnhwoGOPbnlrf16l8+twk2O9gfGjiIquO1dRiJXzO0G6dE2v+yOdXAQ7XFjG6WUK5fVFwLO1NN/N1uYdk/DDjfGnsT8eYHR0mHYis8qp9noHu3Lfda/URddXfqx7t+vhqINRw9T7x7N5FyUuEruqKTZNqGSIAcJ4gNNk4ualUDqVm3YOhj0cDNuOs2e+DAwANjY3vCgAEkq9V8qoG4WV5ry5O5UN9oj2mGG001+pMKX8FdN05wwHdjdFfLXk5/SD064aj0YwsJXXep+nHk9dbtXg6NKvxCkXpx5Kd6idSL2SvqXanUR9tEdw/Xw8leWWNELvxMkrvuMqE78q6BA4EdJIXrLhP6RQaTqgG5S1wepNbTBbdLPDFAwV4fzWwQ3CCpGiMKYaJolS4VYWaSqQOCePzaKIty+Xj7gFARIkhUP4B3kUHhh0MaLBUDg7cmNY+A1pXl08dEnmkxVpBGsk4XzP/vS7hyDwBruttI/kplzx7JYLCOX4vdXkiqRqDMMUe6yCDOIkjrn4HExkK6yLARvmu7eoyEnzDKVtblHQHN33TH2/nMjoKhQckkUYhELypYL1COX6+4LL44SfmdDV67tbPuvAcfpSPOnWp25ijN6wi5MtXBWJ6NhbAmtWcw8NVGYHhp/5r58evWWgT7r/Y77arU+CKD23wkv8/O0aS5uzPOpKj5BX7/wLBpN5oGqW5GdWyJneoshhcZZtVyAS5dF5VRrTg1vMhQM6OO3Y3a2jkAwzPylbVIs7tQnWqMprvPdQT4ss/eVuUoy82kQ/E2o8Cgu/CpaoyOXz9eL2RWrr6nmovBQ8oX6thnb8ublxe+9Uf3P4tQ7vGUlYd+Ju2LSQVnz7comnPa7keQ5CcCsbo/RXMu0432ENBaloUiA0f+DDtcpy04gua9LS/5rlLpoqVm22TSx7/FmEpmqj9y6jmfbXJJRgAAAABJRU5ErkJggg==" alt="star" height= "15px"/>
          </div>
        )}
      </div>
        <div>
          <div className="card-separator"></div>
          <div className="explore-bottom">
            <div className="res-bottom-text"><i className="fi fi-rr-phone absolute-center" /> {description}</div>
          </div>
        </div>
    </div>
  );
};


export {ExploreCourseCard};