<?php
namespace Acme\BlogBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity
 * @ORM\Table(name="blog_post")
 */
class Post
{
    /**
     * @ORM\Id
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @ORM\Column(type="string", length=100)
     */
    protected $title;    

    /**
     * @ORM\Column(type="text")
     */
    protected $content;
	
	/**
     * @ORM\Column(type="integer")	 
     */
    protected $fk_blog_id;

    /**
     * @ORM\Column(type="datetime")	 
     */
    protected $created_at;
	
	/**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }
	
	public function setId($id)
    {
        return $this->id=$id;
    }

    /**
     * Set title
     *
     * @param string $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * Get title
     *
     * @return string 
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set content
     *
     * @param text $content
     */
    public function setContent($content)
    {
        $this->content = $content;
    }

    /**
     * Get content
     *
     * @return text 
     */
    public function getContent()
    {
        return $this->content;
    }

    /**
     * Set fk_blog_id
     *
     * @param integer $fkBlogId
     */
    public function setFkBlogId($fkBlogId)
    {
        $this->fk_blog_id = $fkBlogId;
    }

    /**
     * Get fk_blog_id
     *
     * @return integer 
     */
    public function getFkBlogId()
    {
        return $this->fk_blog_id;
    }
	
	

    /**
     * Set created_at
     *
     * @param datetime $createdAt
     */
    public function setCreatedAt($createdAt)
    {
        $this->created_at = $createdAt;
    }

    /**
     * Get created_at
     *
     * @return datetime 
     */
    public function getCreatedAt()
    {
        return $this->created_at;
    }
}