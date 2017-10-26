# Note: some of these actions may be unnecessary once I start fetching more data immediately upon login!

class CollectionsController < ApplicationController

  def index
    @collection = current_user.collections
    render :index
  end

  def show
    @collection = current_user.collections.find(params[:id])
    render :show
  end

  def create
    @collection = current_user.collections.new(collection_params)

    if @collection.save
      render :index
    else
      render json: @collection.errors.full_messages, status: 422
    end
  end

  def destroy
    @collection = current_user.collections.find(params[:id])

    if @collection && @collection.destroy
      render :index
    else
      render json: ["Collection could not be destroyed!"], status: 404
    end
  end

  def update
    @collection = current_user.collections.find(params[:id])

    if @collection.update(collection_params)
      render :show
    else
      render json: @collection.errors.full_messages, status: 422
    end
  end

  private

  def collection_params
    params.require(:current_user).permit(:name)
  end
end
