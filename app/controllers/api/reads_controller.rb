class Api::ReadsController < ApplicationController

  def create
    @read = Read.new(
      article_id: read_params[:article_id],
      user_id: current_user.id)
      if @read.save
        render :index
      else
        render json: @read.errors.full_messages, status: 422
      end
  end

  def destroy
    @read = Read.find_by(
      article_id: params[:id],
      user_id: current_user.id
    )

    if @read
      @read.destroy
      render :index
    else
      render json: ["Read does not exist"], status: 404
    end
  end

  private

  def read_params
    params.require(:read).permit(:article_id)
  end
end
