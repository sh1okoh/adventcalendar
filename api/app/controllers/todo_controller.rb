class TodoController < ApplicationController

  def create
    pr
    create_params
  end

  def index
    index_params
  end

  def update
    update_params
  end

  def destroy
    destroy_params
  end

  private

  def create_params
    params.require(:todo).permit(%i[id name])
  end

  def index_params
    params.require(:todo).permit(%i[id name])
  end

  def update_params
    params.require(:todo).permit(%i[id name])
  end

  def destroy_params
    params.require(:todo).permit(%i[id name])
  end
end
