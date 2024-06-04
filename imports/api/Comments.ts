import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

/**
 * The ArticlesCollection. It encapsulates state and variable values for stuff.
 */
class CommentsCollection {
  /** @type {string} */
  name;

  /** @type {Mongo.Collection<any>} */
  collection;

  /** @type {SimpleSchema} */
  schema;

  /** @type {string} */
  userPublicationName;

  constructor() {
    // The name of this collection.
    this.name = 'ArticlesCollection';
    // Define the Mongo collection.
    this.collection = new Mongo.Collection(this.name);
    // Define the structure of each document in the collection.
    this.schema = new SimpleSchema({
      text: String,
      articleId: String,
      createdOn: Date,
      createdById: Date,
    });
    // Attach the schema to the collection, so all attempts to insert a document are checked against schema.
    this.collection.attachSchema(this.schema);
    // Define names for publications and subscriptions
    this.userPublicationName = `${this.name}.publication.user`;
  }
}

/**
 * The singleton instance of the StuffsCollection.
 * @type {CommentsCollection}
 */
export const Comments = new CommentsCollection();
