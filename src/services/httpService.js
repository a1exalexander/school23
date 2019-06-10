import http from 'axios';

export default class HttpService {

  _apiBase = 'https://jsonplaceholder.typicode.com';

  _api = {
    awards(n) {
      return `${this._apiBase}/todos/${n}`
    },
    teachers: `${this._apiBase}/users/`,
    teacher: (id) => {
      return `${this._apiBase}/users/${id}`
    },
    news: `${this._apiBase}/posts/`,
    oneNews(n) {return `${this._apiBase}/posts/${n}`},
  }

  getResource = async (url) =>  {
    try {
      const res = await http.get(url);
      return res;
    } catch(e) {
      console.error(e);
      throw new Error(`Could not fetch ${url}, received ${e.status}, Response: ${e.response}`);
    }
  }

  getAllTeachers = async () => {
    const {data = []} = await this.getResource(this._api.teachers);
    return data.map(this._tranformTeacher);
  }

  getTeacher = async (id) => {
    const {data} = await this.getResource(this._api.teacher(id));
    return this._tranformTeacher(data);
  }

  getAllNews = async () => {
    const {data} = await this.getResource(this._api.news);
    return data.map(this._tranformNews);
  }

  getOneNews = async (id) => {
    const {data} = await this.getResource(this._api.oneNews(id));
    return this._tranformNews(data);
  }

  _tranformTeacher = (teacher) => {
    return {
      id: teacher.id,
      // ava: require("../assets/images/poroh.jpg"),
      ava: null,
      name: teacher.name,
      username: teacher.username,
      phone: teacher.phone,
      email: teacher.email,
      company: teacher.company.name,
    }
  }

  _tranformNews = (news) => {
    return {
      id: news.id,
      title: news.title,
      body: news.body,
      image: news.image,
    }
  }
}
