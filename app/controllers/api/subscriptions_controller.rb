class Api::SubscriptionsController < ApplicationController

  def create
    @subscription = Subscription.new(subscription_params)

    if @subscription.save
      @collections = current_user.collections.includes(:feeds, :articles)
      render 'api/collections/index'
    else
      render json: @subscription.errors.full_messages, status: 422
    end
  end

  def destroy
    @subscription = Subscription.find_by_feed_and_collection(
      subscription_params[:feed_id],
      params[:id]
    ).includes(:collection, :feed)

    if @subscription
      @subscription.destroy
      render :show
    else
      render json: ["Unable to remove subscription"], status: 422
    end
  end

  private

  def subscription_params
    params.require(:subscription).permit(:collection_id, :feed_id)
  end
end
