var topicData = [{
    			  "title":  "Topic 1"
    			, "concept": "Concept 1"
    			, "items": [
        				{
            					  "title": "Item 1-1"
            					, "desc": "Description 1-1"
        				 }
        				,{
            					  "title": "Item 1-2"
            					, "desc": "Description 1-2"
        				}]
		  }
		, {
    			  "title": "Topic 2"
    			, "concept": "Concept 1"
    			, "items": [
        				{
            				  "title": "Item2-1"
            				, "desc": "Description 2-1"
				}]
		}];

describe("Topic", function () {

    beforeEach(function () {
        this.topic = new Topic(topicData[0]);
    });

    it("creates from data", function () {
        expect(this.topic.get('items').length).toEqual(2);
    });

});
