class Api::FeedsController < ApplicationController
  # Need to add jbuilder views once we get into articles
  def show
    @feed = current_user.feeds.find(params[:id])
    render json: @feed.title
  end
end
