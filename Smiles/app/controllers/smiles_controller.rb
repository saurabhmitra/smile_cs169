class SmilesController < ApplicationController

  skip_before_action :verify_authenticity_token  # this is an API so JSON POST requests won't have CSRF headers.

  def new
  	@smile = Smile.new(:space => params[:space], :title => params[:title], :story => params[:story], :happiness_level => params[:happiness_level], :like_count => 0)
  	if @smile.save
  	  # @smile.timestamp = @smile.created_at
  	  render :json => {:status => 1, :smile => @smile}
  	else
  	  render :json => {:status => -1, :errors => @smile.errors.full_messages}
  	end
  end

  def get
  	# @smile.timestamp = @smile.created_at
  	render :json => {:status => 1, :smiles => Smile.order(params[:order_by]).last(params[:count].to_i).reverse}
  end

  def like
  	@smile = Smile.find(params[:id])
  	@smile.like_count = @smile.like_count + 1
  	if @smile.save
  	  # @smile.timestamp = @smile.created_at
  	  render :json => {:status => 1, :smile => @smile}
  	else
  	  render :json => {:status => -1, :errors => @smile.errors.full_messages}
  	end
  end

  def remove
  	if Smile.where(:space => params[:space]).delete_all
  	  render :json => {:status => 1}
  	else
  	  render :json => {:status => -1, :errors => "Stack Overflow Exception"}
  	end
  end
end
