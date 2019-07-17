const expect = require('chai').expect;
const request = require('supertest');
const app = require('../app');

describe('GET /apps', () => {
  it('smoke test', () => {
    return request(app)
      .get('/apps');
  });
  it('returns an array of objects', () => {
    return request(app)
      .get('/apps')
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('array').that.has.lengthOf.at.least(1);
        expect(res.body[0]).to.be.an('object');
      });
  });
  it('is invalid for unallowed query parameters', () => {
    return request(app)
      .get('/apps?a=12')
      .expect(400, 'Remove invalid query parameter');
  });

  it('is invalid for invalid genre query', () => {
    return request(app)
      .get('/apps?genres=12')
      .expect(400, 'Need a valid genres parameter');
  });

  it('is invalid for invalid sort query', () => {
    return request(app)
      .get('/apps?sort=12')
      .expect(400, 'Need a valid sort parameter');
  });

  it('is filtering by genre', () => {
    return request(app)
      .get('/apps?genres=action')
      .expect(200, filteredByGenre);
  });
  it('is sorting by rating', () => {
    return request(app)
      .get('/apps?sort=rating')
      .expect(200)
      .expect(res =>{
        expect(res.body[0]).to.eql(sortedByRatingFirstElement);
      });
  });


});

const sortedByRatingFirstElement= {"App":"Solitaire","Category":"GAME","Rating":4.7,"Reviews":"254258","Size":"23M","Installs":"10,000,000+","Type":"Free","Price":"0","Content Rating":"Everyone","Genres":"Card","Last Updated":"August 1, 2018","Current Ver":"2.137.0","Android Ver":"4.1 and up"};

const filteredByGenre = 
  [
    { "App": "ROBLOX", "Category": "GAME", "Rating": 4.5, "Reviews": "4447388", "Size": "67M", "Installs": "100,000,000+", "Type": "Free", "Price": "0", "Content Rating": "Everyone 10+", "Genres": "Adventure;Action & Adventure", "Last Updated": "July 31, 2018", "Current Ver": "2.347.225742", "Android Ver": "4.1 and up" }, 
    { "App": "slither.io", "Category": "GAME", "Rating": 4.4, "Reviews": "5234162", "Size": "Varies with device", "Installs": "100,000,000+", "Type": "Free", "Price": "0", "Content Rating": "Everyone", "Genres": "Action", "Last Updated": "November 14, 2017", "Current Ver": "Varies with device", "Android Ver": "2.3 and up" }, { "App": "Temple Run 2", "Category": "GAME", "Rating": 4.3, "Reviews": "8118609", "Size": "62M", "Installs": "500,000,000+", "Type": "Free", "Price": "0", "Content Rating": "Everyone", "Genres": "Action", "Last Updated": "July 5, 2018", "Current Ver": "1.49.1", "Android Ver": "4.0 and up" }, { "App": "Helix Jump", "Category": "GAME", "Rating": 4.2, "Reviews": "1497361", "Size": "33M", "Installs": "100,000,000+", "Type": "Free", "Price": "0", "Content Rating": "Everyone", "Genres": "Action", "Last Updated": "April 9, 2018", "Current Ver": "1.0.6", "Android Ver": "4.1 and up" }, { "App": "Zombie Hunter King", "Category": "GAME", "Rating": 4.3, "Reviews": "10306", "Size": "50M", "Installs": "1,000,000+", "Type": "Free", "Price": "0", "Content Rating": "Mature 17+", "Genres": "Action", "Last Updated": "August 1, 2018", "Current Ver": "1.0.8", "Android Ver": "2.3 and up" }, { "App": "Kick the Buddy", "Category": "GAME", "Rating": 4.3, "Reviews": "1000417", "Size": "Varies with device", "Installs": "50,000,000+", "Type": "Free", "Price": "0", "Content Rating": "Teen", "Genres": "Action", "Last Updated": "July 5, 2018", "Current Ver": "Varies with device", "Android Ver": "4.4 and up" }
  ];