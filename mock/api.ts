import mockjs, {Random} from 'mockjs';


export default {
  'GET /api/faq': mockjs.mock({
    'results|10': [{
      'id|+1': 0,
      'title': () => Random.ctitle(3, 5),
      'content': () => Random.csentence(10, 20)
    }]
  }),
  'GET /api/history': mockjs.mock({
    'results|10': [{
      'id|+1': 0,
      'title': () => Random.ctitle(3, 5),
      'content': () => Random.csentence(10, 20)
    }]
  })
};
