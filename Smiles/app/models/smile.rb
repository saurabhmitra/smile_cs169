class Smile < ActiveRecord::Base
	validates :space, :presence => true, length: {minimum: 1, maximum: 128}
	validates :title, :presence => true, length: {minimum: 1, maximum: 64}
	validates :story, :presence => true, length: {minimum: 1, maximum: 2048}
	validates :happiness_level, :presence => true
	validates :like_count, :presence => true
end
