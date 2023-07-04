import {FacebookShareButton, TwitterShareButton,PinterestShareButton,
        FacebookIcon, TwitterIcon, PinterestIcon } from 'react-share'

const Share = () => {
  const shareUrl = 'placeholder'
  const title = 'placeholder'

  return (
    <div className="flex space-x-2 mt-4">
      <FacebookShareButton url={shareUrl} quote={title}>
        <FacebookIcon size={20} round={true} />
      </FacebookShareButton>

      <TwitterShareButton url={shareUrl} title={title}>
        <TwitterIcon size={20} round={true} />
      </TwitterShareButton>

      <PinterestShareButton url={shareUrl} media={'image-url'} description={title}>
        <PinterestIcon size={20} round={true} />
      </PinterestShareButton>
    </div>
  )
};

export default Share;