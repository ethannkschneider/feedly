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

  # if a user gets rid of a collectino, they will lose all of the feeds
  # in that collection
  has_many :subscriptions,
    dependent: :destroy

  has_many :feeds,
    through: :subscriptions,
    source: :feed

  has_many :articles,
    through: :feeds,
    source: :articles

end
