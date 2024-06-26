import App from '../../src/components/App.js';

describe ('Search', function() {
  var {
    Simulate,
    renderIntoDocument,
    findRenderedDOMComponentWithClass,
    scryRenderedDOMComponentsWithClass
  } = ReactTestUtils;

  var app, searchYouTubeStub;

  describe('when rendering live data from YouTube', function() {
    beforeEach(function() {
      searchYouTubeStub = sinon.stub();
      searchYouTubeStub.onCall(0).yields(window.fakeVideoData);
      searchYouTubeStub.onCall(1).yields(window.moreFakeVideoData);

      app = renderIntoDocument(
        <Wrapper>
          <App searchYouTube={searchYouTubeStub} />
        </Wrapper>
      );
    });

    it('should load live data when app is initialized', function() {
      var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      videoEntryTitleElements.forEach((videoEntryTitle, i) => {
        console.log(videoEntryTitle);
        console.log(fakeVideoData[i].snippet.title);
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });
    });

    it('should update the video list when typing into the input box', function() {
      var videoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      videoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.innerHTML).to.equal(fakeVideoData[i].snippet.title);
      });

      var searchInputElement = findRenderedDOMComponentWithClass(app, 'form-control');
      Simulate.change(searchInputElement, {target: {value: 'React tutorial'}});

      var newVideoEntryTitleElements = scryRenderedDOMComponentsWithClass(app, 'video-list-entry-title');
      newVideoEntryTitleElements.forEach((videoEntryTitle, i) => {
        expect(videoEntryTitle.innerHTML).to.equal(moreFakeVideoData[i].snippet.title);
      });
    });
  });
});
