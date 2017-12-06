class Api::FeedsController < ApplicationController

  def show
    @feed = current_user.feeds.find(params[:id])
    render json: @feed.title
  end

  def index
    @matchedFeeds = Feed.where('title ILIKE ?', "%#{feeds_params[:searchText]}%")
    render :index
  end

  def unsubscribe_from_current_user_collections
    @feed_subscriptions = current_user.subscriptions.where(feed_id: feeds_params[:feed_ids])

    if @feed_subscriptions
      @feed_subscriptions.destroy_all
      render json: ["Successfully unsubscribed"], status: 200
    else
      render json: ["Current user has no collections containing that feed!"], status: 404
    end
  end


  def feeds_params
    params.require(:feeds).permit(:searchText, feed_ids: [])
  end
end
