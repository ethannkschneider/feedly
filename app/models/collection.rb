# == Schema Information
#
# Table name: collections
#
#  id         :integer          not null, primary key
#  name       :string           not null
#  user_id    :integer          not null
#  created_at :datetime         not null
#  updated_at :datetime         not null
#

class Collection < ApplicationRecord
  validates :name, :user, presence: true
  
  belongs_to :user


end
