import { render, screen, within, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import RatingsReviews from './RatingsReviews'
import dummyIO from './test-data/dummyIO'
import serverIO from './serverIO'
import sinon from 'sinon'


describe('Ratings and Reviews', ()=>{
  const RR = <RatingsReviews productId={0}/>
  const spyReviews = sinon.stub(serverIO, "getReviews").callsFake(dummyIO.fakeReviews)
  const spyVote = sinon.stub(serverIO, "castVote").callsFake(dummyIO.fakeVote)
  const spyMeta = sinon.stub(serverIO, 'getMetadata').callsFake(dummyIO.fakeMeta)

  afterEach(()=>{
    spyReviews.resetHistory()
    spyVote.resetHistory()
  })

  describe('ReviewsList', ()=>{
    it('Should display two reviews', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
    })

    it('Should show the "more reviews" button', async ()=>{
      render(RR)
      await waitFor(()=>{
        let button = screen.getByText('More Reviews')
        expect(button).toBeVisible()
      })
    })

    it('Should display two more reviews when button is clicked', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      await userEvent.click(screen.getByText('More Reviews'))
      expect(screen.getAllByTestId('review').length).toBe(4)
    })

    it('Should hide the button if all reviews are displayed', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      let button = screen.getByText('More Reviews')
      await userEvent.click(button)
      await userEvent.click(button)
      await userEvent.click(button)
      button = screen.queryByText('More Reviews')
      expect(button).not.toBeVisible()
    })
  })

  describe('Review Tile', ()=>{

    it('Should show Star Rating', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      let reviews = screen.getAllByTestId('review')
      reviews.forEach((review)=>{
        expect(within(review).getByTestId('stars')).toBeInTheDocument()
      })
    })

    it('Should display review date', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      expect(screen.getAllByText(/2023/)[0]).toBeInTheDocument()
    })
    it('Should display review summary (aka title)', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      expect(screen.getAllByText('Yes')[0]).toBeInTheDocument()
      expect(screen.getByText('Best purchase')).toBeInTheDocument()
    })
    it('Should display review body', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      expect(screen.getAllByText(/Yes/)[0]).toBeInTheDocument()
      expect(screen.getByText(/I loved it/)).toBeInTheDocument()
    })
    it('Should display reviewer name', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      expect(screen.getByText(/JSON/)).toBeInTheDocument()
      expect(screen.getByText(/hello/)).toBeInTheDocument()
    })
    it('Should ask if review was helpful', async ()=>{
      render(RR)
      await waitFor(()=>{
        expect(screen.getAllByTestId('review').length).toBe(2)
      })
      expect(screen.getAllByText(/Was this review helpful\?/).length).toBe(2)
      expect(screen.getAllByText('Yes (0)').length).toBe(2)
    })

    it('Should update count when "Yes" is clicked', async ()=>{
      render(RR)
      var links = await screen.findAllByText(/Yes \(\d+\)/)
      links.forEach((link)=>{
        expect(within(link).getByText('Yes (0)')).toBeInTheDocument()
      })
      await userEvent.click(links[1])
      expect(await screen.findByText(/Yes \(1\)/)).toBeInTheDocument()
    })
  })
})