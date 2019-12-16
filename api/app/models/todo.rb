class Todo < ApplicationRecord

  def as_json(options = {})
    super(options.reverse_merge(except: %i[created_at updated_at]))
  end
end
