import { Meteor } from 'meteor/meteor';
import { Articles } from '../../api/Article';

const createArticle = (article) => {
    Articles.collection.insert(article);
};

if (Articles.collection.find().count() === 0) {
    createArticle({
        title: "test",
        description: "testing",        
    })
}