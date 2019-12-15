class TodoController < ApplicationController
  $todo_list = []
  def create
    print "aaaaaa";
    p create_params
    $todo_list.push(create_params)
    render json: $todo_list
  end

  def index
    render json: $todo_list
  end

  def update
    update_params
  end

  def destroy
    destroy_params
  end

  private

  def create_params
    params.require(:todo).permit(%i[id text])
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
