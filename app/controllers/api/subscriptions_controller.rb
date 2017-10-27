class Api::SubscriptionsController < ApplicationController

  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save
      #change later once you figure out what should happen after user subscribes to a feed
      render json: ["Successfully subscribed!"], status: 200
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @subscription = Subscription.find_by_feed_and_collection(
      subscription_params[:feed_id],
      params[:id]
    )

    if @subscription
      @subscription.destroy
      # change later (see above)
      render json: ["Successfully unsubscribed from feed!"]
    else
      render json: ["Unable to remove subscription"], status: 422
    end
  end

  private

  def subscription_params
    params.require(:subscription).permit(:collection_id, :feed_id)
  end
end
